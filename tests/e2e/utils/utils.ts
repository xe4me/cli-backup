
export function expectToFail(fn: () => Promise<any>): Promise<void> {
  return fn()
    .then(() => {
      throw new Error(`Function ${fn.source} was expected to fail, but succeeded.`);
    }, () => {});
}

export function isMobileTest() {
  return !!process.env['MOBILE_TEST'];
}

export function wait(msecs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, msecs);
  });
}
