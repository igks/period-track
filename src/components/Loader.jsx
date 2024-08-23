import { Spinner } from "reactstrap";
import { Container } from "./Container";

export const Loader = () => {
  return (
    <Container>
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
    </Container>
  );
};
