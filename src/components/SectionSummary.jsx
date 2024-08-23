export const SectionSummary = ({ data = [] }) => {
  return (
    <>
      {data?.map((d) => (
        <div
          key={`${d.label}-${d.value}`}
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
          <p style={{ fontSize: 14, margin: 0 }}>{d.value}</p>
        </div>
      ))}
    </>
  );
};
