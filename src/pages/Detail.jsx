import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Card, CardBody, Container } from "reactstrap";
import { SectionSummary } from "../components/SectionSummary";
import { Space } from "../components/Space";
import { useLog } from "../states/logState";

export const Detail = () => {
  const { table } = useLog((state) => state);
  const sortedTable = table.sort((a, b) => a.index - b.index);

  const summaries = [];
  for (let i = 1; i < sortedTable.length; i++) {
    summaries.push({
      data: [
        {
          label: "Tgl sebelumnya",
          value: dayjs(sortedTable[i].after).format("DD MMM YYYY"),
        },
        {
          label: "Tgl aktual",
          value: dayjs(sortedTable[i - 1].after).format("DD MMM YYYY"),
        },
        {
          label: "Tgl prediksi",
          value: dayjs(sortedTable[i].prediction).format("DD MMM YYYY"),
        },
        {
          label: "Periode",
          value: sortedTable[i].period,
        },
        {
          label: "Akurasi",
          value: sortedTable[i].accuracy
            ? sortedTable[i].accuracy?.toString()?.charAt(0) == "-"
              ? `Maju ${sortedTable[i].accuracy?.toString()?.charAt(1)} hari`
              : `Mundur ${sortedTable[i].accuracy?.toString()?.charAt(0)} hari`
            : "Akurat",
        },
      ],
    });
  }

  return (
    <Container fluid style={{ paddingBottom: 30 }}>
      <h5>Detail</h5>
      <hr />
      <Link to="/">Home</Link>
      <Space height={10} />

      {summaries.map((summary, index) => {
        return (
          <Card
            key={`details-${index}`}
            style={{
              width: "18rem",
              padding: "5px",
              marginBottom: "10px",
            }}
          >
            <CardBody>
              <SectionSummary data={summary.data} />
            </CardBody>
          </Card>
        );
      })}
    </Container>
  );
};
