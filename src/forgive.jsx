import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, Element } from "react-scroll";


function Forgive_Me({className, setEnd}) {
    const [showYesButton, setShowYesButton] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ top: "50%", left: "50%" });
    const noButtonRef = useRef(null);
  
    // Delayed appearance of the Yes button after 10 seconds
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowYesButton(true);
      }, 15000); // 10 seconds
  
      return () => clearTimeout(timer);
    }, []);


    const HeartIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21C12 21 6 14 3 9C1.5 7.5 2 5 4 4C5.5 3.5 7.5 4 9 5.5C10.5 7 12 8.5 12 8.5C12 8.5 13.5 7 15 5.5C16.5 4 18.5 3.5 20 4C22 5 22.5 7.5 21 9C18 14 12 21 12 21Z" />
        </svg>
      );
      
      // Container and Navbar

      const Button = styled.button`
  font-size: 1.2em;
  padding: 15px 30px;
  background-color: ${(props) => (props.primary ? "#f6b5c0" : "#f0a0b9")};
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

      const Container = styled.div`
        font-family: 'Comic Sans MS', sans-serif;
        background-color: #fdf3f7;
        color: #8e6f7c;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height: 100vh;
        position: relative;
      `;
      
      const Navbar = styled.nav`
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
        z-index: 1000;
      `;
      
      const NavLink = styled(Link)`
        color: #8e6f7c;
        font-size: 18px;
        text-decoration: none;
        padding: 10px 20px;
        background-color: #e8c1c3;
        border-radius: 20px;
        transition: background-color 0.3s ease;
        &:hover {
          background-color: #f6b5c0;
        }
      `;
      
      const Title = styled.h1`
        font-size: 2.5em;
        margin-bottom: 20px;
        color: #ffb6b9;
      `;
      
      // Section Style with Transitions
      const Section = styled.section`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        visibility: hidden;
        transform: translateY(100px);
        transition: opacity 1s ease, visibility 1s ease, transform 1s ease;
      
        &.active {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      
        &.hidden {
          opacity: 0;
          visibility: hidden;
          transform: translateY(100px);
        }
      `;
      
      const Message = styled.p`
        font-size: 1.5em;
        line-height: 1.6;
        color: #ff85a2;
      `;


  // Move the No button randomly when the user tries to hover over it
  const handleMouseMove = (e) => {
    const button = noButtonRef.current;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const distanceX = e.clientX - (buttonRect.left + buttonRect.width / 2);
    const distanceY = e.clientY - (buttonRect.top + buttonRect.height / 2);
    
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 100) { // If the mouse is close enough to the button, move it
      const randomX = Math.random() * 200 - 100; // Random X displacement
      const randomY = Math.random() * 200 - 100; // Random Y displacement
      setNoButtonPosition({
        top: `calc(50% + ${randomY}px)`,
        left: `calc(50% + ${randomX}px)`,
      });
    }
  };

  // Add mousemove event listener for the "No" button
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <Element name="forgive-me">
    <Section className={className}>
      <Title>Forgive Me {String.fromCodePoint('0x1F979')}</Title>
      <Message>
        I understand if you're upset with me. But I promise I wont do it again. Hahaha I wont do it even if you try to initiate it {String.fromCodePoint('0x1F923')}
      </Message>
      <Message>
        Will you forgive me ?
      </Message>
      <HeartIcon/>
      {showYesButton && (
          <Button primary onClick={() => setEnd(1)}>
            Yes
          </Button>
        )}

        {/* No Button */}
        <Button
          ref={noButtonRef}
          style={{ position: "absolute", top: noButtonPosition.top, left: noButtonPosition.left }}
          onClick={() => alert("Come on, pleaseee.....Forgive meeee !!!!!")}>
          No
        </Button>

    </Section>
  </Element>
  )
}

export default Forgive_Me