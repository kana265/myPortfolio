import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import dyp from "../../assets/images/dyp.png";
import highschool from "../../assets/images/highschool.jpeg";
import sos from "../../assets/images/sos.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            Kana Hayashi
            <br /> ポートフォリオをご覧いただきありがとうございます。
            私は会津大学で3DCGアニメーションを学んでいます。主にBlenderを使って、キャラクターや背景のモデリング、アニメーション制作に取り組んでいます。
            <br /> 料理を作ること、そして美味しいものを食べることが大好きで、3Dアニメーションの中でも、"美味しそう" と感じてもらえる表現に強く惹かれています。
            また、幼少期から続けてきたピアノのおかげで音楽も大切な表現の一つになっており、ライブや演奏シーンに命を吹き込むような演出にも挑戦しています。
            <br /> 私が目指しているのは、ただリアルな映像を作るのではなく「美味しそう」「楽しそう」「切ない」といった、人の心がふっと揺れる瞬間を映像の中で表現することです。
            日常の中にある感情の高ぶりを、丁寧にすくい取る作品を創作できるようになりたいです。

          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                
                p: "Portions of this code were developed by Teshank Raut. You can find the original project at https://github.com/teshank2137/portfolio",
                image: sos,
              }}
            />
           
            
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
