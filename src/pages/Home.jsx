import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { AddLogModal } from "../components/AddLogModal";
import { FloatButton } from "../components/FloatButton";
import { Loader } from "../components/Loader";
import { Space } from "../components/Space";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { getLog, updateLog } from "../services/database";
import { useLog } from "../states/logState";
import { useUser } from "../states/userState";
import { CardSummary } from "./../components/CardSummary";
import { summarize } from "./../utils/summarize";

export const Home = () => {
  const { user } = useUser((state) => state);
  const { sortedData, setSortedData, setTable } = useLog((state) => state);
  const { logout } = useFirebaseAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const loadRecord = async () => {
    setLoading(true);

    const res = await getLog();
    const sortedRecord = res.sort((a, b) => b.index - a.index);
    setSortedData(sortedRecord);
  };

  const startCalculation = () => {
    const result = summarize(sortedData);
    setData(result);
    setTable(result.table);
    setLoading(false);
  };

  const updateDateHandler = async (date) => {
    if (!date) return;
    if (!confirm("Apakah yakin ingin menambah data?")) return;

    const index = sortedData.length + 1;
    const newDate = {
      index,
      date,
    };
    const newDates = [newDate, ...sortedData];
    await updateLog(newDates);
    loadRecord();
  };

  useEffect(() => {
    if (sortedData.length == 0) {
      loadRecord();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (sortedData.length !== 0) {
      startCalculation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData]);

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
        </Col>
      </Row>
      <FloatButton onClick={() => setIsOpenModal(true)} />
      <AddLogModal
        isOpen={isOpenModal}
        toggleModal={() => setIsOpenModal(!isOpenModal)}
        onSave={(date) => updateDateHandler(date)}
      />
      <Space height={20} />
      <Link to="/detail">Lihat Detail</Link>
      <Space width={20} height={20} />
      <Link to="#" onClick={logout}>
        Logout
      </Link>
    </Container>
  );
};
