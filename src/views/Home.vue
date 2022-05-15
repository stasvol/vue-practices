<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div class="row">
      <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p class="currency-line">
              <span>12.0 Р</span>
            </p>
          </div>
        </div>
      </div>

      <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Курс валют</span>
            </div>
            <table>
              <thead>
              <tr>
                <th>Валюта</th>
                <th>Курс</th>
                <th>Дата</th>
              </tr>
              </thead>

              <tbody>
              <tr>
                <td>руб</td>
                <td>12121</td>
                <td>12.12.12</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>


<!--<template>-->
<!--  <div>-->
<!--    <div class="app-main-layout">-->
<!--&lt;!&ndash;      <nav class="navbar orange lighten-1">&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="nav-wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="navbar-left">&ndash;&gt;-->
<!--&lt;!&ndash;            <a href="#">&ndash;&gt;-->
<!--&lt;!&ndash;              <i class="material-icons black-text">dehaze</i>&ndash;&gt;-->
<!--&lt;!&ndash;            </a>&ndash;&gt;-->
<!--&lt;!&ndash;            <span class="black-text">12.12.12</span>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->

<!--&lt;!&ndash;          <ul class="right hide-on-small-and-down">&ndash;&gt;-->
<!--&lt;!&ndash;            <li>&ndash;&gt;-->
<!--&lt;!&ndash;              <a&ndash;&gt;-->
<!--&lt;!&ndash;                  class="dropdown-trigger black-text"&ndash;&gt;-->
<!--&lt;!&ndash;                  href="#"&ndash;&gt;-->
<!--&lt;!&ndash;                  data-target="dropdown"&ndash;&gt;-->
<!--&lt;!&ndash;              >&ndash;&gt;-->
<!--&lt;!&ndash;                USER NAME&ndash;&gt;-->
<!--&lt;!&ndash;                <i class="material-icons right">arrow_drop_down</i>&ndash;&gt;-->
<!--&lt;!&ndash;              </a>&ndash;&gt;-->

<!--&lt;!&ndash;              <ul id='dropdown' class='dropdown-content'>&ndash;&gt;-->
<!--&lt;!&ndash;                <li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <a href="#" class="black-text">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="material-icons">account_circle</i>Профиль&ndash;&gt;-->
<!--&lt;!&ndash;                  </a>&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--&lt;!&ndash;                <li class="divider" tabindex="-1"></li>&ndash;&gt;-->
<!--&lt;!&ndash;                <li>&ndash;&gt;-->
<!--&lt;!&ndash;                  <a href="#" class="black-text">&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="material-icons">assignment_return</i>Выйти&ndash;&gt;-->
<!--&lt;!&ndash;                  </a>&ndash;&gt;-->
<!--&lt;!&ndash;                </li>&ndash;&gt;-->
<!--&lt;!&ndash;              </ul>&ndash;&gt;-->
<!--&lt;!&ndash;            </li>&ndash;&gt;-->
<!--&lt;!&ndash;          </ul>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </nav>&ndash;&gt;-->

<!--&lt;!&ndash;      <ul class="sidenav app-sidenav open">&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Счет</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">История</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Планирование</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Новая запись</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;        <li>&ndash;&gt;-->
<!--&lt;!&ndash;          <a href="#" class="waves-effect waves-orange pointer">Категории</a>&ndash;&gt;-->
<!--&lt;!&ndash;        </li>&ndash;&gt;-->
<!--&lt;!&ndash;      </ul>&ndash;&gt;-->
<!--      <main class="app-content">-->
<!--        <div class="app-page">-->

<!--          <div>-->
<!--            <div class="page-title">-->
<!--              <h3>Счет</h3>-->

<!--              <button class="btn waves-effect waves-light btn-small">-->
<!--                <i class="material-icons">refresh</i>-->
<!--              </button>-->
<!--            </div>-->

<!--            <div class="row">-->
<!--              <div class="col s12 m6 l4">-->
<!--                <div class="card light-blue bill-card">-->
<!--                  <div class="card-content white-text">-->
<!--                    <span class="card-title">Счет в валюте</span>-->

<!--                    <p class="currency-line">-->
<!--                      <span>12.0 Р</span>-->
<!--                    </p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="col s12 m6 l8">-->
<!--                <div class="card orange darken-3 bill-card">-->
<!--                  <div class="card-content white-text">-->
<!--                    <div class="card-header">-->
<!--                      <span class="card-title">Курс валют</span>-->
<!--                    </div>-->
<!--                    <table>-->
<!--                      <thead>-->
<!--                      <tr>-->
<!--                        <th>Валюта</th>-->
<!--                        <th>Курс</th>-->
<!--                        <th>Дата</th>-->
<!--                      </tr>-->
<!--                      </thead>-->

<!--                      <tbody>-->
<!--                      <tr>-->
<!--                        <td>руб</td>-->
<!--                        <td>12121</td>-->
<!--                        <td>12.12.12</td>-->
<!--                      </tr>-->
<!--                      </tbody>-->
<!--                    </table>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->
<!--      </main>-->

<!--      <div class="fixed-action-btn">-->
<!--        <a class="btn-floating btn-large blue" href="#">-->
<!--          <i class="large material-icons">add</i>-->
<!--        </a>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
