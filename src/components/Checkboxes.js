import React, { useState } from "react";
import styled from "styled-components";

import StyledInput from "./StyledInput";
import Checkbox from "./Checkbox";

export default function Checkboxes() {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [payment, setPayment] = useState({
    cash: { off: 0 },
    card: { dues: 0, extra: 0 },
  });

  const setValue = (value, mode, variant) =>
    setPayment({ ...payment, [mode]: { ...payment[mode], [variant]: value } });

  const data = [
    {
      title: "Efectivo",
      inputs: [
        {
          label: "Descuento %",
          mode: "cash",
          variant: "off",
        },
      ],
    },
    {
      title: "Mercado Pago",
    },
    {
      title: "Tarjeta crédito",
      inputs: [
        {
          label: "Cuotas",
          mode: "card",
          variant: "dues",
        },
        {
          label: "Interés %",
          mode: "card",
          variant: "extra",
        },
      ],
    },
  ];

  const onCheck = (title) => {
    const element = data.find((opt) => opt.title == title);
    if (element.inputs) {
      if (paymentOptions.find((opt) => opt.title == element.title)) {
        setPaymentOptions(
          paymentOptions.filter((opt) => opt.title != element.title)
        );
      } else setPaymentOptions(paymentOptions.concat(element));
    }
  };

  return (
    <Wrapper>
      <Container>
        {data.map((item) => {
          const { title } = item;
          return <Checkbox key={title} title={title} onCheck={onCheck} />;
        })}
      </Container>
      <Container>
        {paymentOptions.map((element) => {
          return element.inputs.map(({ label, mode, variant }) => {
            return (
              <Label key={label}>
                {label}
                <StyledInput
                  onChangeFn={(e) => setValue(e.target.value, mode, variant)}
                  type="number"
                  val={payment[mode][variant]}
                  width="31px"
                />
              </Label>
            );
          });
        })}
      </Container>
    </Wrapper>
  );
}
const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "60%",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});
const Label = styled.label({
  display: "flex",
  fontSize: "11px",
});
