/** Fixed background: off-white ground with one faint blue wash at the top. */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-ground">
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(60%_60%_at_70%_0%,rgba(0,72,245,0.07),transparent_70%)]" />
    </div>
  );
}
