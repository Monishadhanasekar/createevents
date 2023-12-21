import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';

function App() {
  const [eventname, setEventname] = useState('');
  const [eventstartdate, setEventstartdate] = useState('');
  const [eventenddate, setEventenddate] = useState('');
  const [eventdays, setEventdays] = useState('');
  const [exceptiondate, setExceptiondate] = useState('');
  const [priceperclass, setPriceperclass] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalclasses, setTotalclasses] = useState(0);
  const [totalprice, setTotalprice] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    if (eventstartdate && eventenddate && eventdays && exceptiondate) {
      const startDate = moment(eventstartdate);
      const endDate = moment(eventenddate);
      const exceptionDay = moment(exceptiondate);
      let count = 0;

      while (startDate.isSameOrBefore(endDate)) {
        if (startDate.format('dddd') === eventdays) {
          count++;
        }
        startDate.add(1, 'day');
      }

      if (
        exceptionDay.isValid() &&
        moment(exceptiondate).format('dddd') === eventdays
      ) {
        count--;
      }

      setTotalclasses(count);
      setTotalprice(count * priceperclass);
      setTotal(totalprice + (totalprice * tax) / 100);
    }
  }, [eventstartdate, eventenddate, eventdays, exceptiondate, priceperclass, tax, totalprice]);

  const eventFormRef = useRef(null);

  const handleResetFields = () => {
    console.log("reset field function calling")
    setEventname('');
    setEventstartdate('');
    setEventenddate('');
    setEventdays('');
    setExceptiondate('');
    setPriceperclass(0);
    setTax(0);
    setTotalclasses(0);
    setTotalprice(0);
    setTotal(0);
    if (eventFormRef.current) {
      eventFormRef.current.reset();
    }
  };

  return (
    <div className="App">
  <form ref={eventFormRef}>
    <div className="row">
      <div className="row-item-full">
        <label>Event name</label>
        <input type="text" onChange={(e) => setEventname(e.target.value)} />
      </div>
    </div>
    <div className="row">
      <div className="row-item-half">
        <label>Event start Date</label>
        <input type="date" onChange={(e) => setEventstartdate(e.target.value)} />
      </div>
      <div className="row-item-half">
        <label>Event end date</label>
        <input type="date" onChange={(e) => setEventenddate(e.target.value)} />
      </div>
    </div>
    <div className="row">
      <div className="row-item-half">
        <label>Event Days</label>
        <input type="text" onChange={(e) => setEventdays(e.target.value)} />
      </div>
      <div className="row-item-half">
        <label>Exception Date</label>
        <input type="date" onChange={(e) => setExceptiondate(e.target.value)} />
      </div>
    </div>
    <div className="row">
    <div className="row-item-half">
        <label>Total no of classes</label>
        <input type="text" value={totalclasses} readOnly />
      </div>
      <div className="row-item-half">
        <label>Price per class</label>
        <input type="text" onChange={(e) => setPriceperclass(e.target.value)} />
      </div>
    </div>
    <div className="row">
    <div className="row-item-half">
        <label>Total Event Price</label>
        <input type="text" value={totalprice} readOnly />
      </div>
      <div className="row-item-half">
        <label>Tax (%)</label>
        <input type="text" onChange={(e) => setTax(e.target.value)} />
      </div>
      <div className="row-item-full">
        <label>Total (Including Tax)</label>
        <input type="text" value={total} readOnly />
      </div>
    </div>
    <div className="center">
      <button type="button" onClick={handleResetFields}>Create</button>
    </div>
  </form>
  </div>
  );
}

export default App;
