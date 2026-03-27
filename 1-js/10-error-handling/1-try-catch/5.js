
function func() {

  try {
    return 1;

  } catch (err) {
    /* ... */
  } finally {
    console.log( 'finally' );
  }
}

console.log( func() ); // 先执行 finally 中的 alert，然后执行这个 alert
