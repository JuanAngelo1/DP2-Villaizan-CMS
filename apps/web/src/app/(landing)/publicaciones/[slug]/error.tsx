"use client";
function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div>La publicación que buscas no existe</div>;
}
export default Error;
