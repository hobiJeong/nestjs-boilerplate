export async function generateNanoid(size?: number) {
  const { nanoid } = await import('nanoid');
  return nanoid(size);
}
