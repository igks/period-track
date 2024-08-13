import dayjs from "dayjs";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { SectionSummary } from "./SectionSummary";
import { Space } from "./Space";

export const CardSummary = ({ data }) => {
  const normalCycle = [
    {
      label: "Sebelum",
      date: data.normal.before,
    },
    {
      label: "Ovulasi",
      date: data.normal.ovulation,
    },
    {
      label: "Setelah",
      date: data.normal.after,
    },
  ];
  const abnormalCycle = [
    {
      label: "Sebelum",
      date: data.abnormal.before,
    },
    {
      label: "Ovulasi",
      date: data.abnormal.ovulation,
    },
    {
      label: "Setelah",
      date: data.abnormal.after,
    },
  ];
  const statistik = [
    {
      label: "Rata - rata periode", //
      date: data.periodAve,
    },
    {
      label: "Siklus terpendek",
      date: data.minPeriod,
    },
    {
      label: "Siklus terpanjang",
      date: data.maxPeriod,
    },
    {
      label: "Kategori",
      date: data.category,
    },
    {
      label: "Rata - rata akurasi",
      date: data.accuracyAve,
    },
    {
      label: "Tanggal terakhir",
      date: dayjs(data.table[data.table.length - 1].after).format(
        "DD MMM YYYY"
      ),
    },
    {
      label: "Tanggal prediksi",
      date: dayjs(data.table[data.table.length - 1].prediction).format(
        "DD MMM YYYY"
      ),
    },
  ];
  return (
    <Card
      style={{
        width: "18rem",
        padding: "5px",
      }}
    >
      <CardBody>
        <CardTitle tag="h5">Rangkuman</CardTitle>
        <Space height={10} />
        <CardSubtitle
          className="mb-2 text-muted"
          tag="h6"
          style={{ textAlign: "left" }}
        >
          Statistik - {data.table.length} samples
        </CardSubtitle>
        <hr style={{ marginTop: "8px", marginBottom: "8px" }} />
        <SectionSummary data={statistik} />
        <Space height={30} />
        {data.category === "Normal" ? (
          <>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
              style={{ textAlign: "left" }}
            >
              Siklus Normal
            </CardSubtitle>
            <hr style={{ marginTop: "8px", marginBottom: "8px" }} />
            <SectionSummary data={normalCycle} />
          </>
        ) : (
          <>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
              style={{ textAlign: "left" }}
            >
              Siklus Tidak Normal
            </CardSubtitle>
            <hr style={{ marginTop: "8px", marginBottom: "8px" }} />
            <SectionSummary data={abnormalCycle} />
          </>
        )}
      </CardBody>
    </Card>
  );
};
