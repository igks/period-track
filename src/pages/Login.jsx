import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Loader } from "../components/Loader";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useUser } from "../states/userState";
import { Space } from "./../components/Space";

export const Login = () => {
  const { login, loading, checkActiveUser } = useFirebaseAuth();
  const { user } = useUser((state) => state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (!username || !password) {
      return;
    }
    await login(username, password);
  };

  useEffect(() => {
    checkActiveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Card
      style={{
        width: "18rem",
        padding: "5px",
      }}
    >
      <CardBody>
        <CardTitle tag="h5">Login</CardTitle>
        <Space height={10} />
        <Form>
          <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              onChange={(ev) => setUsername(ev.currentTarget.value)}
            />
          </FormGroup>
          <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              onChange={(ev) => setPassword(ev.currentTarget.value)}
            />
          </FormGroup>
          <Button color="success" onClick={onLogin}>
            Login
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
