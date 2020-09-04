import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StyledInput from "./StyledInput";
import Checkbox from "./Checkbox";

export default function Checkboxes({ payment, setPayment }) {
  const [cashInput, setCashInput] = useState([]);
  const [cardInputs, setCardInputs] = useState([]);

  useEffect(() => {
    const { cash, card } = payment;
    if (cash) {
      setCashInput(cashInput.concat(data[0]));
      setVariantValue(cash.off, "cash", "off");
    }
    if (card) {
      setCardInputs(cardInputs.concat(data[2]));
      setVariantValue(card.dues, "card", "dues");
      setVariantValue(card.extra, "card", "extra");
    }
  }, []);

  const setVariantValue = (value, mode, variant) =>
    setPayment({ ...payment, [mode]: { ...payment[mode], [variant]: value } });

  const setModeValue = (value, mode) =>
    setPayment({ ...payment, [mode]: value });

  const data = [
    {
      title: "Efectivo",
      box: cashInput,
      initialVal: { off: 0 },
      mode: "cash",
      setter: setCashInput,
      inputs: [
        {
          label: "Descuento %",
          variant: "off",
        },
      ],
    },
    {
      title: "Mercado Pago",
      mode: "mercadopago",
    },
    {
      title: "Tarjeta crédito",
      box: cardInputs,
      initialVal: { dues: 0, extra: 0 },
      mode: "card",
      setter: setCardInputs,
      inputs: [
        {
          label: "Cuotas",
          variant: "dues",
        },
        {
          label: "Interés %",
          variant: "extra",
        },
      ],
    },
  ];

  const onCheck = (title) => {
    const element = data.find((opt) => opt.title == title);
    const { inputs, box, setter, mode, initialVal } = element;
    if (inputs) {
      if (box.length) {
        setter(box.filter((opt) => opt.title != title));
        setModeValue(false, mode);
      } else {
        setModeValue(initialVal, mode);
        setter(box.concat(element));
      }
    } else setPayment({ ...payment, [mode]: !payment[mode] });
  };

  const renderInputs = (elements) => {
    return elements.map((element) => {
      return element.inputs.map(({ label, variant }) => {
        return (
          <Label key={label}>
            {label}
            <StyledInput
              onChangeFn={(e) =>
                setVariantValue(e.target.value, element.mode, variant)
              }
              type="number"
              val={payment[element.mode][variant]}
              width="31px"
            />
          </Label>
        );
      });
    });
  };

  return (
    <Wrapper>
      <Container>
        {data.map((item) => {
          const { title, mode } = item;
          return (
            <Checkbox
              checked={payment[mode]}
              key={title}
              title={title}
              onCheck={onCheck}
            />
          );
        })}
      </Container>
      <Container>
        <Box>{renderInputs(cashInput)}</Box>
        <Box>{renderInputs(cardInputs)}</Box>
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
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  fontSize: "11px",
});
const Box = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "35%",
});
