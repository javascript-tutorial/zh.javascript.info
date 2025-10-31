
try {
  console.log( 'try' );
  if (confirm('Make an error?')) BAD_CODE();
} catch (err) {
  console.log( 'catch', err );
} finally {
  console.log( 'finally' );
}
