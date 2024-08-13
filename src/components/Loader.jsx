import { Spinner } from "reactstrap";

export const Loader = () => {
  return (
    <Spinner
      color="primary"
      style={{
        height: "3rem",
        width: "3rem",
        flex: 1,
        alignSelf: "center",
      }}
      type="grow"
    >
      Loading...
    </Spinner>
  );
};
