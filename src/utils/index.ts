export const asyncEvery = async (arr: any[], predicate: (el: any) => Promise<any>) => {
  for (let el of arr) {
    if (!(await predicate(el))) return false;
  }
  return true;
};
