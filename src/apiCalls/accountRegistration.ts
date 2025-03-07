/* eslint-disable @typescript-eslint/no-explicit-any */
export async function checkAccount(
  address: string | undefined,
  BROKER_ID: string
): Promise<boolean> {
  if (!address) return false;
  const options = { method: "GET" };

  try {
    const response = await fetch(
      `https://testnet-api-evm.orderly.network/v1/get_account?address=${address}&broker_id=${BROKER_ID}`,
      options
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse.success;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getRegistrationNonce(): Promise<string | null> {
  const options: RequestInit = { method: "GET" };
  try {
    const response = await fetch(
      "https://testnet-api-evm.orderly.network/v1/registration_nonce",
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonResponse = (await response.json()) as {
      data: { registration_nonce: string };
    };
    const registrationNonce = jsonResponse.data.registration_nonce;
    return registrationNonce;
  } catch (err) {
    console.error(err);
    return null; // or throw err to handle this error upstream
  }
}

export async function registerAccount(
  registerMessage: any,
  userAddress: string,
  signature: string
): Promise<any> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: registerMessage,
      signature,
      userAddress,
    }),
  };

  fetch("https://testnet-api-evm.orderly.network/v1/register_account", options)
    .then((response) => response.json())
    .then((response) => console.log("registration response.......", response))
    .catch((err) => console.error(err));
}
export async function authenticateWallet(
  registerMessage: any,
  userAddress: string,
  signature: string
): Promise<any> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: registerMessage,
      signature,
      userAddress,
    }),
  };
  try {
    const res = await fetch(
      "https://testnet-api-evm.orderly.network/v1/orderly_key",
      options
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }

  // .then((response) => response.json())
  // .then((response) => {
  //   return response;
  // })
  // .catch((err) => console.error(err));
}
export async function getOrderlyPoints(userAddress: string): Promise<any> {
  const data = await fetch(
    `https://api-evm.orderly.network/v1/client/points?address=${userAddress}`
  );
  const response = await data?.json();
  console.log("=====>", response);
  return response.data?.current_epoch_points;

  // .then((response) => response.json())
  // .then(
  //   (response) => response?.data?.current_epoch_points
  //   // console.log(
  //   //   "points response.......",
  //   //   response?.data?.current_epoch_points
  //   // )
  // )
}
