import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { DomSanitizer } from '@angular/platform-browser';

register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  @ViewChild('player') playerRef: ElementRef | undefined;

  progressVal: number[] = [0, 0, 0];
  currentSlideIndex = 0;
  sliderData = [
    // {
    //   isVideoContent: false,
    //   title: 'HEALTH',
    //   description:
    //     'Physical, mental and emotional health cannot be bought, unfortunately. Invest in self-care - a vital part of your personal growth.',
    //   imagePath:
    //     'https://www.smexclusive.org/static/home/img/smx_home_theme_health_v1.0.png',
    //   videoUrl: '',
    // },
    {
      isVideoContent: false,
      title: 'WORK',
      description:
        'In today’s fast-paced, stressed and disconnected world, travel a balanced path to success. Discover the spark to reach your full potential.',
      imagePath:
        'https://www.smexclusive.org/static/home/img/smx_home_theme_work_v1.0.png',
      videoUrl: '',
    },
    {
      isVideoContent: true,
      title: 'Kirtan Vs Chanting For deeper Connection to God',
      description: '',
      imagePath: '',
      videoUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/BpN8OFjMMhA' //?autoplay=1&mute=1
      ),
      duration: 0.52, // in minutes
    },
    {
      isVideoContent: false,
      title: 'RELATIONSHIPS',
      description:
        'Seed the right foundations for emotional nourishment. Uproot toxicity. Build lasting connections which endures the test of time.',
      imagePath:
        'https://www.smexclusive.org/static/home/img/smx_home_theme_relationships_v1.0.png',
      videoUrl: '',
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  closeModal() {
    this.currentSlideIndex = 0;
    this.progressVal = [];
    this.modal.dismiss(null, 'cancel');
  }

  onModalOpen() {
    this.progressVal = new Array(this.sliderData.length).fill(0);
    console.log(this.progressVal);
    this.checkProgressStateV1();
  }

  onWillDismiss(event: Event) {}

  checkProgressStateV1() {
    if (this.progressVal[this.currentSlideIndex] === 0) {
      this.changeProStateV1(this.currentSlideIndex);
    } else {
      console.log('done');
    }
  }

  changeProStateV1(i) {
    let slideDuration = 10;
    let stepper = 0.01;
    if (this.sliderData[i].isVideoContent) {
      // slideDuration = this.sliderData[i].duration * 60 * 10;
    }
    setTimeout(() => {
      if (this.progressVal[i] < 1) {
        this.progressVal[i] = this.progressVal[i] + stepper;
        this.changeProStateV1(i);
      } else if (this.progressVal[i] >= 1) {
        if (this.sliderData[i].isVideoContent) {
          console.log(this.playerRef.nativeElement.onended);
        } else {
          if (this.sliderData.length > this.currentSlideIndex + 1) {
            this.currentSlideIndex = this.currentSlideIndex + 1;
            this.checkProgressStateV1();
            if (this.swiperRef && this.swiperRef.nativeElement) {
              this.swiperRef.nativeElement.swiper.slideNext();
            }
          }
        }
      }
    }, slideDuration);
  }

  onSlideChange(e) {
    console.log('slide changed', e.target.swiper.activeIndex);
    if (this.currentSlideIndex < e.target.swiper.activeIndex) {
      this.currentSlideIndex = e.target.swiper.activeIndex;
      this.changeProStateV1(e.target.swiper.activeIndex);
    }
    if (this.currentSlideIndex > e.target.swiper.activeIndex) {
      this.progressVal = this.progressVal.map((val, i) =>
        i < e.target.swiper.activeIndex ? 1 : 0
      );
      console.log(this.progressVal);
      this.currentSlideIndex = e.target.swiper.activeIndex;
      this.changeProStateV1(e.target.swiper.activeIndex);
    }
  }
}
