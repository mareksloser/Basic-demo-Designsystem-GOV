class ChipPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h1>Chips</h1>
			<h4>Chips close</h4>
			<div class="container-view">
				<gov-chip variant="primary" size="s" inverse="">
				Not clickable S
				<gov-button slot="right" variant="primary" type="base" wcag-label="Zavřít vše" size="s">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="s">
				Not clickable S
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="s">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="m">
				Not clickable M
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="m">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="l">
				Not clickable L
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="l">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="xl">
				Not clickable XL
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="xl">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			</div>
			<h4>Chips close (inversed)</h4>
			<div class="container-view gov-bg--primary-600">
			<gov-chip variant="primary" size="s" inverse>
				Not clickable S
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="s">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="m" inverse>
				Not clickable M
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="m">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="l" inverse>
				Not clickable L
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="l">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="xl" inverse>
				Not clickable XL
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="xl">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			</div>
			<h4>Chips - primary (default)</h4>
			<div class="container-view">
				<gov-chip variant="primary" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="primary" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" disabled href="http://www.example.com/" target="_blank">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="l" href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large Primary
				</gov-chip>
			</div>
			<h4>Chips - primary (inversed)</h4>
			<div class="container-view">
				<gov-chip variant="primary" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="primary" size="s" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" href="http://www.example.com/" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" disabled href="http://www.example.com/" target="_blank" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="l" href="http://www.example.com/" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="xl" disabled inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large Primary
				</gov-chip>
			</div>
			<h4>Chips - primary (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="primary" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="primary" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
				</gov-chip>
				<gov-chip variant="primary" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
				</gov-chip>
				<gov-chip variant="primary" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
				</gov-chip>
				<gov-chip variant="primary" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - secondary (default)</h4>
			<div class="container-view">
				<gov-chip variant="secondary" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="secondary" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="secondary" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="secondary">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="secondary" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="secondary" size="l" tag="a">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large secondary
				</gov-chip>
			</div>
			<h4>Chips - secondary (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="secondary" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="secondary" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
				</gov-chip>
				<gov-chip variant="secondary" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
				</gov-chip>
				<gov-chip variant="secondary" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
				</gov-chip>
				<gov-chip variant="secondary" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - success (default)</h4>
			<div class="container-view">
				<gov-chip variant="success" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="success" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="success" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="success">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="success" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="success" size="l" tag="a">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large success
				</gov-chip>
			</div>
			<h4>Chips - success (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="success" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="success" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
				</gov-chip>
				<gov-chip variant="success" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
				</gov-chip>
				<gov-chip variant="success" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
				</gov-chip>
				<gov-chip variant="success" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - warning (default)</h4>
			<div class="container-view">
				<gov-chip variant="warning" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="warning" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="warning" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="warning">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="warning" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="warning" size="l" tag="a">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large warning
				</gov-chip>
			</div>
			<h4>Chips - warning (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="warning" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="warning" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
				</gov-chip>
				<gov-chip variant="warning" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
				</gov-chip>
				<gov-chip variant="warning" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
				</gov-chip>
				<gov-chip variant="warning" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - error (default)</h4>
			<div class="container-view">
				<gov-chip variant="error" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="error" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="error" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="error">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="error" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="error" size="l" href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large error
				</gov-chip>
			</div>
			<h4>Chips - error (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="error" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="error" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
				</gov-chip>
				<gov-chip variant="error" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
				</gov-chip>
				<gov-chip variant="error" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
				</gov-chip>
				<gov-chip variant="error" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
				</gov-chip>
			</div>
		`;
  }
}
if (customElements.get('chip-page') === undefined) {
  customElements.define('chip-page', ChipPage);
}
//# sourceMappingURL=Chip.js.map
