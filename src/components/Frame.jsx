import React, { Component } from "react";
import style from "./frame.module.css";
import Screen from "./Screen";
import Wheel from "./Wheel";

export default class Frame extends Component {
  constructor() {
    super();
    this.state = {
      isMenuActive: false,
      menuStack: ["Main"],
      selectedItemIndex: 0,
      isSelectBtnActive: false,
      isScrolling: false,
      startAngle: 0,
    };
    // Reference to the wheel for calculating its position
    this.wheelRef = React.createRef();
  }

  handleMenu = () => {
    // this.setState((prevState) => ({ isMenuActive: !prevState.isMenuActive }));
    this.setState((prevState) => {
      if (prevState.menuStack.length > 1) {
        // Pop the current menu to go back
        const newMenuStack = prevState.menuStack.slice(0, -1);
        return { menuStack: newMenuStack, isSelectBtnActive: false };
      } else {
        // If at root menu, toggle menu visibility
        return { isMenuActive: !prevState.isMenuActive, isSelectBtnActive: false };
      }
    });
  };

  calculateAngle = (e) => {
    const wheel = this.wheelRef.current;
    const rect = wheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Adding support for touch and pointer
    const pointerX = e.clientX || e.touches[0].clientX;
    const pointerY = e.clientY || e.touches[0].clientY;

    // Calculate the angle between the center of the wheel and the pointer position
    const angle =
      Math.atan2(pointerY - centerY, pointerX - centerX) * (180 / Math.PI);

    // Convert negative angles to positive
    return angle >= 0 ? angle : 360 + angle;
  };

  handleScrollStart = (e) => {
    e.preventDefault();
    const startAngle = this.calculateAngle(e);
    this.setState({ isScrolling: true, startAngle });

    // Add event listeners for pointer move and up (to track scrolling movement)
    window.addEventListener("pointermove", this.handleScrollMove);
    window.addEventListener("pointerup", this.handleScrollEnd);
  };

  handleScrollMove = (e) => {
    if (!this.state.isScrolling) return;

    const currentAngle = this.calculateAngle(e);
    const angleDiff = currentAngle - this.state.startAngle;

    // Determine the scroll direction based on the angle difference
    if (Math.abs(angleDiff) > 15) {
      // Only trigger if angle change is significant
      const direction = angleDiff > 0 ? 1 : -1;

      this.setState((prevState) => ({
        selectedItemIndex: (prevState.selectedItemIndex + direction + 4) % 4,
        // Reset start angle for the next movement
        startAngle: currentAngle,
      }));
    }
  };

  handleScrollEnd = () => {
    this.setState({ isScrolling: false });

    // Remove the event listeners when scrolling ends
    window.removeEventListener("pointermove", this.handleScrollMove);
    window.removeEventListener("pointerup", this.handleScrollEnd);
  };

  handleSelect = () => {
    const { selectedItemIndex, menuStack, isMenuActive } = this.state;
    const currentMenu = menuStack[menuStack.length - 1];

    // If menu is closed disable select button
    if (!isMenuActive) return;

    // Handle menu transitions based on the selected index and current menu
    let newMenu = null;
    if (currentMenu === "Main") {
      if (selectedItemIndex === 0) newMenu = "Cover";
      if (selectedItemIndex === 1) newMenu = "Music";
      if (selectedItemIndex === 2) newMenu = "Games";
      if (selectedItemIndex === 3) newMenu = "Settings";
    } else if (currentMenu === "Music") {
      if (selectedItemIndex === 0) newMenu = "AllSongs";
      if (selectedItemIndex === 1) newMenu = "Artists";
      if (selectedItemIndex === 2) newMenu = "Albums";
    }

    if (newMenu) {
      this.setState((prevState) => ({
        menuStack: [...prevState.menuStack, newMenu],
        // Resetting selection when entering a new menu
        selectedItemIndex: 0,
        // Ensuring menu remains active while navigating
        isMenuActive: true,
      }));
    } else {
      this.setState({ isSelectBtnActive: true });
    }
  };

  render() {
    const { isMenuActive, menuStack, selectedItemIndex, isSelectBtnActive } =
      this.state;
    const currentMenu = menuStack[menuStack.length - 1];
    return (
      <div className={style.container}>
        <div className={style.frame}>
          <Screen
            isMenuActive={isMenuActive}
            currentMenu={currentMenu}
            selectedItemIndex={selectedItemIndex}
            isSelectBtnActive={isSelectBtnActive}
          />
          <Wheel
            handleMenu={this.handleMenu}
            handleScrollStart={this.handleScrollStart}
            handleSelect={this.handleSelect}
            wheelRef={this.wheelRef}
          />
        </div>
      </div>
    );
  }
}
