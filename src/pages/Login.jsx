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
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useUser } from "../states/userState";
import { Space } from "./../components/Space";
import { auth } from "./../services/fb";

export const Login = () => {
  const { login, loading: firebaseLoading } = useFirebaseAuth();
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser((state) => state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    if (!username || !password) {
      return;
    }
    await login(username, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser !== user) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (user) {
    return <Navigate to="/" />;
  }

  if (loading || firebaseLoading) {
    return <Loader />;
  }

  return (
    <Container>
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
    </Container>
  );
};
