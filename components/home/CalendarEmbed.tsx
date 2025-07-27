export default function CalendarEmbed() {
  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-papaya-whip mb-2">
        Save the Date
      </h2>
      <div className="max-w-[600px] mx-auto">
        <iframe
          src="https://calget.com/73wd3hco?cal=iframe"
          width="100%"
          height="294"
          style={{
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          }}
          title="Calendar Event Download Options"
        />
      </div>
    </div>
  );
}
