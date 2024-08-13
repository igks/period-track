import dayjs from "dayjs";

export function summarize(dates) {
  if (dates.length === 1) return null;

  // Create table
  // Add date before and after
  const table = [];
  for (let i = 0; i < dates.length - 1; i++) {
    const after = dates[i].date;
    const before = dates[i + 1].date;
    table.unshift({
      index: i + 1,
      before,
      after,
    });
  }

  // Add period
  table.map((data) => {
    const after = dayjs(data.after);
    const before = dayjs(data.before);
    data.period = after.diff(before, "day") + 1;
  });

  let totalPeriod = 0;
  for (let data of table) {
    totalPeriod += data.period;
  }
  const periodAve = totalPeriod / table.length;

  // Add prediction
  table.map((data) => {
    data.prediction = dayjs(data.after)
      .add(periodAve, "day")
      .format("YYYY-MM-DD");
  });

  // Accuracy
  table.map((data, index) => {
    if (index + 1 !== table.length) {
      const prediction = dayjs(data.prediction);
      const actual = dayjs(table[index + 1].after);
      const different = prediction.diff(actual, "day");
      data.accuracy = -different;
    }
  });
  let accuracyTotal = 0;
  for (let data of table) {
    accuracyTotal += data.accuracy ?? 0;
  }
  const accuracyAve = accuracyTotal / table.length;
  const period = table.map((data) => data.period);

  const minPeriod = Math.min(...period) - 18;
  const maxPeriod = Math.max(...period) - 11;

  const minNormalCycle = dayjs(dates[0].date).add(11, "day");
  const maxNormalCycle = dayjs(dates[0].date).add(15, "day");
  const minAbnormalCycle = dayjs(dates[0].date).add(minPeriod, "day");
  const maxAbnormalCycle = dayjs(dates[0].date).add(maxPeriod, "day");

  return {
    periodAve: Math.round(periodAve),
    minPeriod,
    maxPeriod,
    category: periodAve >= 21 && periodAve <= 35 ? "Normal" : "Tidak Normal",
    accuracyAve: Math.round(accuracyAve),
    normal: {
      before: dayjs(minNormalCycle).subtract(4, "day").format("DD MMM YYYY"),
      ovulation: `${minNormalCycle.format(
        "DD MMM YYYY"
      )} - ${maxNormalCycle.format("DD MMM YYYY")}`,
      after: dayjs(maxNormalCycle).add(4, "day").format("DD MMM YYYY"),
    },
    abnormal: {
      before: dayjs(minAbnormalCycle).subtract(5, "day").format("DD MMM YYYY"),
      ovulation: `${minAbnormalCycle.format(
        "DD MMM YYYY"
      )} - ${maxAbnormalCycle.format("DD MMM YYYY")}`,
      after: dayjs(maxAbnormalCycle).add(5, "day").format("DD MMM YYYY"),
    },
    table,
  };
}
