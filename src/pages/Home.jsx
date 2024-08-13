import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { AddLogModal } from "../components/AddLogModal";
import { FloatButton } from "../components/FloatButton";
import { Loader } from "../components/Loader";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { getLog, updateLog } from "../services/database";
import { useUser } from "../states/userState";
import { CardSummary } from "./../components/CardSummary";
import { Space } from "./../components/Space";
import { summarize } from "./../utils/summarize";

export const Home = () => {
  const { logout } = useFirebaseAuth();
  const { user } = useUser((state) => state);

  const [dates, setDates] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const loadRecord = async () => {
    setLoading(true);

    const res = await getLog();
    const sortedRecord = res.sort((a, b) => b.index - a.index);
    setDates(sortedRecord);
  };

  const startCalculation = () => {
    const result = summarize(dates);
    setData(result);
    setLoading(false);
  };

  const updateDateHandler = async (date) => {
    if (!date) return;
    if (!confirm("Apakah yakin ingin menambah data?")) return;

    const index = dates.length + 1;
    const newDate = {
      index,
      date,
    };
    const newDates = [newDate, ...dates];
    await updateLog(newDates);
    loadRecord();
  };

  useEffect(() => {
    loadRecord();
  }, []);

  useEffect(() => {
    if (dates.length !== 0) {
      startCalculation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) return <Loader />;

  return (
    <Container fluid>
      <Row>
        <Col
          md={{
            offset: 3,
            size: 6,
          }}
          sm="12"
        >
          <CardSummary data={data} />
          <Space height={20} />

          <Button color="success" size="sm" onClick={logout}>
            Logout
          </Button>
        </Col>
      </Row>
      <FloatButton onClick={() => setIsOpenModal(true)} />
      <AddLogModal
        isOpen={isOpenModal}
        toggleModal={() => setIsOpenModal(!isOpenModal)}
        onSave={(date) => updateDateHandler(date)}
      />
    </Container>
  );
};
