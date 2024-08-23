import dayjs from "dayjs";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { SectionSummary } from "./SectionSummary";
import { Space } from "./Space";

export const CardSummary = ({ data }) => {
  const normalCycle = [
    {
      label: "Sebelum",
      value: data.normal.before,
    },
    {
      label: "Ovulasi",
      value: data.normal.ovulation,
    },
    {
      label: "Setelah",
      value: data.normal.after,
    },
  ];
  const abnormalCycle = [
    {
      label: "Sebelum",
      value: data.abnormal.before,
    },
    {
      label: "Ovulasi",
      value: data.abnormal.ovulation,
    },
    {
      label: "Setelah",
      value: data.abnormal.after,
    },
  ];
  const statistik = [
    {
      label: "Tanggal terakhir",
      value: dayjs(data.table[data.table.length - 1].after).format(
        "DD MMM YYYY"
      ),
    },
    {
      label: "Tanggal prediksi",
      value: dayjs(data.table[data.table.length - 1].prediction).format(
        "DD MMM YYYY"
      ),
    },
    {
      label: "Rata - rata akurasi",
      value:
        data.accuracyAve?.toString()?.charAt(0) == "-"
          ? `Maju ${data.accuracyAve?.toString()?.charAt(1)} hari`
          : `Mundur ${data.accuracyAve?.toString()?.charAt(0)} hari`,
    },
    {
      label: "Rata - rata periode",
      value: data.periodAve,
    },
    {
      label: "Siklus terpendek",
      value: data.minPeriod,
    },
    {
      label: "Siklus terpanjang",
      value: data.maxPeriod,
    },
    {
      label: "Kategori",
      value: data.category,
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
        <hr />
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
