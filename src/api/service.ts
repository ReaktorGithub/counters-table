export async function serviceGet(input: string) {
  const response = await fetch(input);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}
