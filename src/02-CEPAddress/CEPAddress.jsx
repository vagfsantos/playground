// https://brasilapi.com.br/api/cep/v1/{cep}
import { useState, useEffect } from "react";

// TODO: Display error when API fail return message
// TODO: Do not allow text on input
// TODO: Display error when user type different input then (NNNNNNNNN)
// TODO: Integration Tests
// TODO: Isolate logic into a Custom Hook

export const CEPAddress = () => {
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);

  const [cepValue, setCepValue] = useState(searchParams.get("cep"));
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("cep")) {
      handleGetCep();
      setCepValue(searchParams.get("cep"));
    }
  }, []);

  const handleGetCep = () => {
    setLoading(true);
    fetch(`https://brasilapi.com.br/api/cep/v1/${cepValue}`)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setAddress(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGetCep();
        }}
      >
        <input
          type="text"
          placeholder="Digete seu cep"
          onChange={(e) => {
            setCepValue(e.target.value);
          }}
          value={cepValue}
        />
        <input type="submit" />
      </form>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {address && (
              <p>
                Você está localizado na: {address?.street} -{" "}
                {address?.neighborhood}, {address?.city}
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};
