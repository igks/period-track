export const SectionSummary = ({ data = [] }) => {
  return (
    <>
      {data.map((d) => (
        <div
          key={d.date}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid gray",
            margin: "10px",
            marginBottom: "5px",
          }}
        >
          <p style={{ fontSize: 14, margin: 0 }}>{d.label}</p>
          <p style={{ fontSize: 14, margin: 0 }}>{d.date}</p>
        </div>
      ))}
    </>
  );
};
