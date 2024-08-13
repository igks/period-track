export const FloatButton = ({ onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: "100%",
        backgroundColor: "green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
      onClick={onClick}
    >
      <h2>+</h2>
    </div>
  );
};
