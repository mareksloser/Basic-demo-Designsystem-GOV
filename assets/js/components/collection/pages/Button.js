class ButtonPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h1>Buttons</h1>

			<h4>Dropdown</h4>

			<gov-layout>
				<gov-layout-column>
					<div class="container-view">
						<gov-dropdown>
							<gov-button variant="primary" size="s">
								Více
							</gov-button>
							<ul slot="list">
								<li>
									<gov-button variant="primary" type="base" size="s">
										A další nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="primary" type="base" size="s">
										A další dlouhá nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="primary" type="base" size="s">
										A další
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
							</ul>
						</gov-dropdown>
					</div>
				</gov-layout-column>
				<gov-layout-column>
					<div class="container-view">
						<gov-dropdown position="right">
							<gov-button variant="primary" size="s">
								Více
							</gov-button>
							<ul slot="list">
								<li>
									<gov-button variant="secondary" type="base" size="s">
										A další nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="secondary" type="base" size="s">
										A další dlouhá nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="secondary" type="base" size="s">
										A další
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
							</ul>
						</gov-dropdown>
					</div>
				</gov-layout-column>
			</gov-layout>

			<h4>Buttons - primary (default)</h4>

			<gov-button variant="primary" size="s" icon-left="basic/info"  icon-right="basic/info" href="http://localhost:3333/button">
					Small Primary Icon Param
				</gov-button>

			<div class="container-view">
				<gov-button variant="primary" size="s" href="http://localhost:3333/button">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br><br>
				<gov-button variant="primary" size="s" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="s" href="http://localhost:3333/button" loading="1" disabled>
					Odeslat
				</gov-button>
				<gov-button variant="primary" href="http://localhost:3333/button" loading="0">
					Odeslat
				</gov-button>
				<gov-button variant="primary" href="http://localhost:3333/button" loading="1" disabled>
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="l" loading="true">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="l" loading="true" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="xl" loading="false">
					Odeslat
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="xl" loading="true" disabled>
					Odeslat
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<h4>Buttons - primary (expanded)</h4>
			<div class="container-view">
				<gov-button variant="primary" expanded="true">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Expanded
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
			</div>
			<h4>Buttons - primary (inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (outlined)</h4>
			<div class="container-view">
				<gov-button variant="primary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (outlined inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>

			<h4>Buttons - primary (base)</h4>
			<div class="container-view">
				<gov-button variant="primary" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (base inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (link)</h4>
			<div class="container-view">
				<gov-button variant="primary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (link inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="primary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="primary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (default)</h4>
			<div class="container-view">
				<gov-button variant="secondary" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="secondary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (outlined)</h4>
			<div class="container-view">
				<gov-button variant="secondary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (outlined inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (base)</h4>
			<div class="container-view">
				<gov-button variant="secondary" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (base inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (link)</h4>
			<div class="container-view">
				<gov-button variant="secondary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (link inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Secondary
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="secondary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="secondary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (default)</h4>
			<div class="container-view">
				<gov-button variant="warning" size="s" class="u-mr--medium u-mr-mobile--2xl u-mr-tablet--unset u-mr-portable--medium">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="warning" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (outlined)</h4>
			<div class="container-view">
				<gov-button variant="warning" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (outlined inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (base)</h4>
			<div class="container-view">
				<gov-button variant="warning" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (base inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (link)</h4>
			<div class="container-view">
				<gov-button variant="warning" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (link inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="warning" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="warning" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (default)</h4>
			<div class="container-view">
				<gov-button variant="success" size="s" class="u-mr--medium u-mr-mobile--2xl u-mr-tablet--unset u-mr-portable--medium">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="success" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (outlined)</h4>
			<div class="container-view">
				<gov-button variant="success" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (outlined inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (base)</h4>
			<div class="container-view">
				<gov-button variant="success" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (base inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (link)</h4>
			<div class="container-view">
				<gov-button variant="success" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (link inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="success" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="success" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (default)</h4>
			<div class="container-view">
				<gov-button variant="error" size="s" class="u-mr--medium u-mr-mobile--2xl u-mr-tablet--unset u-mr-portable--medium">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="error" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (outlined)</h4>
			<div class="container-view">
				<gov-button variant="error" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (outlined inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (base)</h4>
			<div class="container-view">
				<gov-button variant="error" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (base inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (link)</h4>
			<div class="container-view">
				<gov-button variant="error" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (link inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="error" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="error" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />
		`;
  }
}
if (customElements.get('button-page') === undefined) {
  customElements.define('button-page', ButtonPage);
}
//# sourceMappingURL=Button.js.map
