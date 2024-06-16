import Donut from "../Donut";
import React, { useState, useEffect  } from "react";
import dayjs from "dayjs";
import SummaryDonut from "../SummaryDonut";

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [90,10],
      backgroundColor: [
        '#4caf50',
        'rgba(0, 0, 0, 0.1)'


      ],
      borderWidth: 1.2,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: 10
    },
    {
      label: 'Dataset 2',
      data: [60,40],
      backgroundColor: [
        '#00bcd4',
        'rgba(0, 0, 0, 0.1)'


      ],
      borderWidth: 1,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: 10
    },
    {
      label: 'Dataset 3',
      data: [70,30],
      backgroundColor: [
        '#e91e63',
        'rgba(0, 0, 0, 0.1)'


      ],
      borderWidth: 1.5,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: 10
    }
  ]
};




const options1 = {
  height: 100,
  borderWidth: 0,
  fullSize: false,
  radius: 20,
  cutout: "50%", // This changes the radius of the Doughnut hole.
  // Add other options here
};

const options2 = {
  borderWidth: 1,
  radius: 30,
  cutout: "50%", // This changes the radius of the Doughnut hole.
  // Add other options here
};

const options3 = {
  borderWidth: 1,
  radius: 40,
  cutout: "50%", // This changes the radius of the Doughnut hole.
  // Add other options here
};
const options4 = {
  borderWidth: 1,
  radius: 50,
  cutout: "50%", // This changes the radius of the Doughnut hole.
  // Add other options here
};

export default function Calendar_Bottom({ selectedDate, onDateChange }) {
    const [date, setDate] = useState(dayjs(selectedDate));
  
    useEffect(() => {
      setDate(dayjs(selectedDate));
    }, [selectedDate]);
  
    const subtractDay = (days) => {
      const newDate = dayjs(date).subtract(days, "day");
      setDate(newDate);
      onDateChange(newDate);
    };
  
    const addDay = (days) => {
      const newDate = dayjs(date).add(days, "day");
      setDate(newDate);
      onDateChange(newDate);
    };

  return (
    <div className="calendar">
      <div onClick={() => subtractDay(3)}>
        <SummaryDonut
            date={date.subtract(3, "day")}
          options={options1}
          width="60px"
          height="60px"
          text={date.subtract(3, "day").format("DD")}
          tooltip={false}
        />
      </div>
      <div onClick={() => subtractDay(2)}>
        <SummaryDonut
          date={date.subtract(2, "day")}
          options={options2}
          width="100px"
          height="100px"
          text={date.subtract(2, "day").format("DD")}
          tooltip={false}

        />
      </div>
      <div onClick={() => subtractDay(1)}>
        {" "}
        <SummaryDonut
          date={date.subtract(1, "day")}
          options={options3}
          width="110px"
          height="110px"
          text={date.subtract(1, "day").format("DD")}
          tooltip={false}

        />
      </div>
      <div>
        {" "}
        <SummaryDonut
          options={options4}
          width="120px"
          height="120px"
          text={date.format("DD")}
          font_size={2}
          tooltip={false}
          date={date}

        />
      </div>
      <div onClick={() => addDay(1)}>
        {" "}
        <SummaryDonut
            date={date.add(1, "day")}
          options={options3}
          width="110px"
          height="110px"
          text={date.add(1, "day").format("DD")}
          tooltip={false}

        />
      </div>
      <div onClick={() => addDay(2)}>
        {" "}
        <SummaryDonut
            date={date.add(2, "day")}
          options={options2}
          width="100px"
          height="100px"
          text={date.add(2, "day").format("DD")}
          tooltip={false}

        />
      </div>
      <div onClick={() => addDay(3)}>
        <SummaryDonut
        date={date.add(3, "day")}
        options={options1}
          width="60px"
          height="60px"
          text={date.add(3, "day").format("DD")}
          tooltip={false}

        />
      </div>
    </div>
  );
}
