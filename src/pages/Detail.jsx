import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";
import { SectionSummary } from "../components/SectionSummary";
import { Space } from "../components/Space";
import { useLog } from "../states/logState";

export const Detail = () => {
  const { table } = useLog((state) => state);
  const sortedTable = table.sort((a, b) => a.index - b.index);

  return (
    <Container fluid style={{ paddingBottom: 30 }}>
      <h5>Detail</h5>
      <hr />
      <Link to="/">Home</Link>
      <Space height={10} />

      {sortedTable.map((data) => {
        const summary = [
          {
            label: "Tgl sebelumnya",
            value: dayjs(data.before).format("DD MMM YYYY"),
          },
          {
            label: "Tgl sekarang",
            value: dayjs(data.after).format("DD MMM YYYY"),
          },
          {
            label: "Periode",
            value: data.period,
          },
          {
            label: "Prediksi",
            value: dayjs(data.prediction).format("DD MMM YYYY"),
          },
          {
            label: "Akurasi",
            value: data.accuracy,
          },
        ];

        return (
          <Card
            key={data.index}
            style={{
              width: "18rem",
              padding: "5px",
              marginBottom: "10px",
            }}
          >
            <CardBody>
              <SectionSummary data={summary} />
            </CardBody>
          </Card>
        );
      })}
    </Container>
  );
};
