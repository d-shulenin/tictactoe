export const removePasswordHash = <T extends { passwordHash: string }>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  passwordHash,
  ...rest
}: T): Omit<T, "passwordHash"> => rest;
