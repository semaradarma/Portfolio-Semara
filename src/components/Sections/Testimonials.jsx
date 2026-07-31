import { testimonials } from "@/data/testimonials";
import TestimonialCard from "@/components/Cards/TestimonialCard";
import MotionWrapper from "@/components/UI/MotionWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";

export default function Testimonials() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.testimonials;

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-8 relative overflow-hidden section-glass">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <MotionWrapper direction="up">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.title}
            </h2>
            <div className="mt-3 w-20 h-1.5 bg-purple-700 dark:bg-purple-400 mx-auto rounded-full" />
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm md:text-base font-semibold">
              {t.subtitle}
            </p>
          </MotionWrapper>
        </div>

        {/* Swiper Testimonials Slider */}
        <MotionWrapper direction="up" delay={0.2}>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            className="pb-16 px-2"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <TestimonialCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </MotionWrapper>

      </div>
    </section>
  );
}
