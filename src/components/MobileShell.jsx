const MobileShell = ({ children, className = "" }) => {
  return (
    <main
      className="
        min-h-[100dvh]
        w-full
        bg-[#E9E4DC]
        font-outfit

        sm:flex
        sm:justify-center
        sm:px-4
        sm:py-4
      "
    >
      <section
        className={`
          relative
          w-full
          min-h-[100dvh]

          overflow-x-hidden

          bg-[#FFFCF7]
          text-[#171512]

          sm:min-h-[calc(100dvh-32px)]
          sm:w-[360px]
          sm:max-w-[360px]

          sm:overflow-hidden
          sm:rounded-[30px]

          sm:border
          sm:border-[#171512]/[0.045]

          sm:shadow-[0_24px_80px_rgba(43,36,28,0.12)]

          ${className}
        `}
      >
        {children}
      </section>
    </main>
  );
};

export default MobileShell;
