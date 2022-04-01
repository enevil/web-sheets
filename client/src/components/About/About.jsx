import { domain } from "../../config";
import css from "./About.module.css";
import Carousel from "./Carousel/Carousel";

const About = () => {
  return (
    <section className={css.container}>
      <h1 className={css.title}>О Компании</h1>
      <div className={css.block}>
        <div className={css.text}>
          Для многих гостей Кофемания — неотъемлемая часть жизни вот уже на
          протяжении 20 лет. Наши гости ценят чуткий сервис, неизменное качество
          и вкус блюд, напитков и десертов. С момента открытия первого ресторана
          и по сей день комфорт и благополучие гостей – наша главная забота. В
          Кофемании удачно сочетаются атмосфера уютной кофейни и ресторана
          высокой кухни с одними из лучших десертов в городе.
        </div>
        <div className={css.carousel}>
          <Carousel>
            <img
              src={`${domain}/static/AboutImages/carousel1.1.jpg`}
              alt="img1"
            />
            <img
              src={`${domain}/static/AboutImages/carousel1.2.jpg`}
              alt="img2"
            />
            <img
              src={`${domain}/static/AboutImages/carousel1.3.jpg`}
              alt="img3"
            />
          </Carousel>
        </div>
      </div>
      <div className={css.block}>
        <div className={css.carousel}>
          <Carousel>
            <img
              src={`${domain}/static/AboutImages/carousel2.1.jpg`}
              alt="img4"
            />
            <img
              src={`${domain}/static/AboutImages/carousel2.2.jpg`}
              alt="img5"
            />
            <img
              src={`${domain}/static/AboutImages/carousel2.3.jpg`}
              alt="img6"
            />
          </Carousel>
        </div>
        <div className={css.text}>
          Сотрудники Кофемании любимы гостями не только благодаря своим
          профессиональным навыкам и знаниям, но и своей отзывчивости и
          искреннему отношению. С 2001 г. Кофемания получила более 40
          профессиональных и общественных наград, многократно завоёвывала титул
          победителя в самых разных соревнованиях и конкурсах.
        </div>
      </div>
      <div className={css.mainText}>
        Из года в год Кофемания подтверждает свою репутацию трендсеттера в
        развитии кофейной культуры России. Именно благодаря Кофемании профессия
        бариста стала частью ресторанного мира, получил популярность самый
        известный русский напиток Раф-кофе, были созданы рецепты, которые
        разлетелись по всей стране. В наших ресторанах работает более 450
        профессиональных бариста высочайшего уровня, мастерски владеющих
        техникой приготовления кофе и искусством латте-арт. Сочетание такого
        масштаба и профессионализма – уникальное явления для мирового кофейного
        рынка.
      </div>
      <Carousel>
        <img src={`${domain}/static/AboutImages/carousel3.1.jpg`} alt="img7" />
        <img src={`${domain}/static/AboutImages/carousel3.2.jpg`} alt="img8" />
      </Carousel>
    </section>
  );
};

export default About;
