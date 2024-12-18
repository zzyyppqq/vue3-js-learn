console.log('Start of script');

queueMicrotask(() => {
    console.log('Microtask 1');
});

queueMicrotask(() => {
    console.log('Microtask 2');
});

console.log('End of script');

