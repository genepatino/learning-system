import React, { useEffect } from "react";
import { connect } from "react-redux";
import AppActions from "../../redux/reducers/appReducer";
import { Container, Form, ContainerMap, Input, Label, H2 } from "./styled";
import { useTranslation } from "react-i18next";
import MapComponent from "./MapComponent/index";
/* import PlaceComponent from "./PlaceComponent/index"; */

/* import Loader from "../utility/components-utility/Loader/index"; */

const Directions = ({ setActiveItem, loader }) => {
  const [t] = useTranslation("global");
  useEffect(() => {
    setActiveItem(8);
  }, [setActiveItem]);

  return (
    <Container>
      <Form>
        {/* <PlaceComponent /> */}
        <H2>{t("labels.route-management")}</H2>
        <Label>{t("titles.origin-address")}</Label>
        <Input type="text" />
        <Label>{t("titles.destination-address")}</Label>
        <Input type="text" />
      </Form>
      <ContainerMap>
        <MapComponent />
      </ContainerMap>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    loader: state.appReducer.loader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveItem: (activeItem) =>
      dispatch(AppActions.setActiveItem(activeItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Directions);
