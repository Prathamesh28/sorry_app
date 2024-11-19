import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Element } from "react-scroll";
import Forgive_Me from "./forgive";

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21C12 21 6 14 3 9C1.5 7.5 2 5 4 4C5.5 3.5 7.5 4 9 5.5C10.5 7 12 8.5 12 8.5C12 8.5 13.5 7 15 5.5C16.5 4 18.5 3.5 20 4C22 5 22.5 7.5 21 9C18 14 12 21 12 21Z" />
  </svg>
);

// Container and Navbar
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


const Gif = styled.img`
  margin-top: 20px;
  max-width: 80%;
  border-radius: 10px;
`;

// Full Screen Sections
const HomePage = ({ className }) => (
  <Element name="home">
    <Section className={className}>
      <Title>Heyy Maria {String.fromCodePoint('0x1FAE3')}</Title>
      <Message>
        I didnt knew how and what to say so I have created this to apologise for yesterday. {String.fromCodePoint('0x1F607')}
      </Message>
      <Message>
        Scroll Down \/
      </Message>
      <HeartIcon/>
    </Section>
  </Element>
);

const SorryPage = ({ className }) => (
  <Element name="sorry">
    <Section className={className}>
      <Title>I am really Sorry</Title>
      <Message>
        I am really sorry, I know I crossed the line yesterday. {String.fromCodePoint('0x1F972')}
      </Message>
      <Message>
        I really regret it.
      </Message>
      <Message>
        Scroll Down \/
      </Message>
      <HeartIcon/>
    </Section>
  </Element>
);




const MistakePage = ({ className }) => (
  <Element name="mistake">
    <Section className={className}>
      <Title>It Was a Mistake</Title>
      <Message>
        It really was a mistake. But you are so amazing and beautiful {String.fromCodePoint('0x1FAE0')}, you cant blame me for that {String.fromCodePoint('0x1FAE3')}. I am not a emotionless robot afterall {String.fromCodePoint('0x1F602')}
      </Message>
      <Message>
        Scroll Down \/
      </Message>
      <HeartIcon/>
    </Section>
  </Element>
);

const ThankYouPage = ({ className }) => (
  <Element name="thank-you">
    <Section className={className}>
      <Title>Thank You</Title>
      <Message>
        Thank you haha. I promise this won't happen again. Lots of kisses for you {String.fromCodePoint('0x1F618')}
      </Message>
      <HeartIcon/>
      <iframe src="https://giphy.com/embed/4YNyqb4VMiIQ8Ipz8n" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </Section>
  </Element>
);
// App Component with Scroll Behavior
const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolling, setScrolling] = useState(false); // Prevent multiple transitions
  const threshold = 700; // Scroll distance threshold (in pixels)
  const [end, setEnd] = useState(0)
  // Detect scroll and change active section with threshold
  const handleScroll = (e) => {
    if (scrolling) return; // Prevent multiple triggers while scrolling

    const scrollY = window.scrollY;
    const screenHeight = window.innerHeight;

    if (e.deltaY > 0) {
      // Scrolling down
      if (scrollY + screenHeight >= threshold) {
        setScrolling(true);
        setActiveSection((prev) => {
          switch (prev) {
            case "home":
              return "sorry";
            case "sorry":
              return "mistake";
            case "mistake":
              return "forgive-me";
            default:
              return prev;
          }
        });
      }
    } else {
      // Scrolling up
      if (scrollY <= threshold) {
        setScrolling(true);
        setActiveSection((prev) => {
          switch (prev) {
            case "forgive-me":
              return "mistake";
            case "mistake":
              return "sorry";
            case "sorry":
              return "home";
            default:
              return prev;
          }
        });
      }
    }
  };

  // Reset scrolling state after transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setScrolling(false); // Allow the next scroll transition
    }, 1000); // Adjust timeout if needed to match the animation duration
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, { passive: true });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [scrolling]);

  return (
    <Container>
      {/* <Navbar>
        <NavLink to="home" smooth={true} duration={500}>
          Home
        </NavLink>
        <NavLink to="sorry" smooth={true} duration={500}>
          Sorry
        </NavLink>
        <NavLink to="forgive-me" smooth={true} duration={500}>
          Forgive Me
        </NavLink>
        <NavLink to="mistake" smooth={true} duration={500}>
          Mistake
        </NavLink>
        <NavLink to="thank-you" smooth={true} duration={500}>
          Thank You
        </NavLink>
      </Navbar> */}

      {/* Correct application of the active class */}
      {end == 0 ? 
      <>
      <HomePage className={activeSection === "home" ? "active" : "hidden"} />
      <SorryPage className={activeSection === "sorry" ? "active" : "hidden"} />
      <Forgive_Me className={activeSection === "forgive-me" ? "active" : "hidden"} setEnd={setEnd}/>
      <MistakePage className={activeSection === "mistake" ? "active" : "hidden"} />
      </>
      :
      <ThankYouPage className={"active"} />}
    </Container>
  );
};

export default App;
