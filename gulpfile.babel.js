// 최신 JS 문법 사용
import gulp from "gulp";
import gulpPug from "gulp-pug";

// task 하기 위해선 function을 eport하거나 const하면 된다.
/* 
    1. task는 모든 pug파일을 가지고 이것들을 가지고 다른 폴더에 집어 넣는게 하나의 task가 된다.
       그 전에 이 파일들을 HTML로 변경한 다음에 넣음 -> 이게 task
    2. scss 파일을 css로 변환할 수도 있다. 코드를 최소화한 다음에 -> task
    - 이런 task들을 묶을 수 있다.
      ex. dev라는 task가 이미지를 최적화하고, JS를 압축하고 모든 파일들을 한 폴더에 집어넣고 그 폴더를 브라우저에 출력 시키는 등
          -> 여러가지 task를 한번에 할 수 있다.(다양한 파트를 가진다.하나의 파트가 pug면 다른 파트는 scss 등...)
    - 할 일은 여러가지의 task를 묶어서 하나의 명령어나 여러 개의 명령어로 묶어서 사용하기
 */

// task 만들기 -> pug파일을 HTML파일로 바꾸기 -> gulp-pug 플러그인 사용
const routes = {
  pug: {
    src: "src/**/*.pug", // (* 하나는 src에 있는 모든 pug파일 전부), /**/ -> 깊게 찾지 않는다. 즉, 지금은 index.pug만 html로 바꿈
    dest: "build", // 목적지(destination)
  },
};

// pipe란 하나의 흐름으로 만들어준다.
// 순서 - 1.routes에서 데이터 가져온다/2. pipe로 흐름을 만들어서 pug()에 넣어준다./3. 그 파일들을 dest에 저장시킨다.
export const pug = () => {
  gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest));
};

export const dev = gulp.series([pug]);
