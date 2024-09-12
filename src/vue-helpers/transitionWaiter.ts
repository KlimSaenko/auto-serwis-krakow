class TransitionWaiter {
    private static resolve: ((value?: any) => void) | undefined;
    private static promise: Promise<any> | undefined;

    public static Add() {
        TransitionWaiter.promise = new Promise(r => {
            TransitionWaiter.resolve = r;
        })
    };

    public static Flush() {
        TransitionWaiter.resolve && TransitionWaiter.resolve();
        TransitionWaiter.resolve = undefined;
        TransitionWaiter.promise = undefined;
    };

    static get Promise() {
        return TransitionWaiter.promise;
    };
};
  
export default TransitionWaiter;