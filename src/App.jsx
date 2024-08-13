import { useEffect, useState } from "react";
import { Button, Col, Container, Input, Row, Spinner } from "reactstrap";
import "./App.css";
import { CardSummary } from "./components/CardSummary";
import { Space } from "./components/Space";
import { getDate, updateDate } from "./services/database";
import { getCurrentDate } from "./utils/dateUtils";
import { summarize } from "./utils/summarize";

function App() {
  const [dates, setDates] = useState([]);
  const today = getCurrentDate();
  const [date, setDate] = useState(today);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRecord = async () => {
    setLoading(true);

    const res = await getDate();
    const sortedRecord = res.sort((a, b) => b.index - a.index);
    setDates(sortedRecord);
  };

  const startCalculation = () => {
    const result = summarize(dates);
    setData(result);
    setLoading(false);
  };

  const updateDateHandler = async () => {
    const index = dates.length + 1;
    const newDate = {
      index,
      date,
    };
    const newDates = [...dates, newDate];
    await updateDate(newDates);
    loadRecord();
  };

  useEffect(() => {
    loadRecord();
  }, []);

  useEffect(() => {
    if (dates.length !== 0) {
      startCalculation();
    }
  }, [dates]);

  return (
    <Container fluid>
      {loading ? (
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
      ) : (
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
            <Input
              name="date"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <Space height={10} />
            <Button color="success" size="sm" onClick={updateDateHandler}>
              Update
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
