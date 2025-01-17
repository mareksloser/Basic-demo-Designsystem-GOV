const removeDiacritics = (string) => {
  if (!string)
    return string;
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const data = () => [
  { name: 'Pepa' },
  { name: 'Katak' },
  { name: 'Tomáš' },
  { name: 'Ludvík' },
  { name: 'Anežda' },
  { name: 'Xaviér' },
  { name: 'Ondřej' },
  { name: 'Mirek' },
  { name: 'Zdeněk' },
  { name: 'Monika' },
  { name: 'Jirka' },
  { name: 'Abrahám' },
  { name: 'Lucie' },
  { name: 'Emily' },
  { name: 'Pavel' },
  { name: 'Gustav' },
  { name: 'Amálie' },
];
class FormsPage extends HTMLElement {
  connectedCallback() {
    ;
    (() => {
      setTimeout(() => {
        const selectedList = document.getElementById('selected');
        const moja = document.getElementById('moja');
        const da = document.getElementById('test-me-ujo');
        const po = document.getElementById('bagr');
        const ba = document.getElementById('ba');
        const na = document.getElementById('kaprWWWWWW');
        const ms = document.getElementById('poleno');
        if (ba) {
          ba.addEventListener('gov-change', function (e) {
            console.log(e);
          });
        }
        if (na) {
          na.addEventListener('gov-blur', function (e) {
            console.log(e);
          });
        }
        if (da) {
          console.log(da);
          da.addEventListener('gov-add-file', function (e) {
            console.log(e.detail);
          });
        }
        if (po) {
          po.addEventListener('gov-select', function (e) {
            console.log(e);
          });
          po.setSearchCallback(val => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(data().filter(({ name }) => {
                  if (!name)
                    return false;
                  return removeDiacritics(name).toLowerCase().indexOf(removeDiacritics(val).toLowerCase()) > -1;
                }));
              }, randomNumber(100, 1000));
            });
          });
        }
        if (ms && selectedList) {
          ms.addEventListener('gov-change', (e) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.detail.value.map((item) => {
              const cta = document.createElement('button');
              cta.innerHTML = item.name;
              cta.addEventListener('click', () => {
                ms.setSelectedOptions([{ value: 'a', name: 'Aneta' }]);
              });
              selectedList.appendChild(cta);
            });
          });
          ms.setOptions([{ value: 'a', name: 'Aneta' }, { value: 'b', name: 'Beata' }, { value: 't', name: 'Tomáš' }]);
          setTimeout(() => {
            //ms.setSelectedOption({value: 'a', name: 'Aneta'})
            //ms.setSelectedOptions([{value: 'a', name: 'Aneta'}])
            //console.log('sets');
            //ms.getSelectedOptions().then((t) => console.log(t))
          }, 5000);
        }
        if (moja) {
          moja.setOptions([{ value: 'd', label: 'Value D' }, { value: 'e', label: 'Value E' }, {
              value: 'f',
              label: 'Value F',
              disabled: true
            }]);
          setTimeout(() => {
            moja.value = 'h';
            moja.setOptions([{ value: 'g', label: 'Value G' }, { value: 'h', label: 'Value H' }, {
                value: 'i',
                label: 'Value I',
              }]);
          }, 2000);
        }
      }, 1000);
    })();
    this.innerHTML = `


<div id="selected" style="border: 1px solid blue"></div>
	<gov-form-control>
				<gov-form-label size="m" slot="top">Multiselect</gov-form-label>
				<gov-form-group>
					<gov-form-multi-select name="test-me" size="xl" id="poleno">
					</gov-form-multi-select>
				</gov-form-group>
			</gov-form-control>

			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select  value="e" name="test-me" size="xl" id="moja">
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<h2>
				Samostatné použití
			</h2>
			<gov-form-input placeholder="Co hledáte" variant="primary">
				<gov-icon slot="right-icon" name="info"></gov-icon>
			</gov-form-input>
			<br>
			<gov-form-select size="l" name="test-me" invalid="true">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<br>
			<gov-form-select size="l" name="test-me" success="true">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<br>
			<gov-form-multi-select size="xl" id="ba" placeholder="Placeholder" wcag-described-by="me-and-you">
				<option value>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d" selected>Value D</option>
				<option value="e">Value E</option>
				<option value="f">Value F</option>
				<option value="g">Value G</option>
				<option value="h">Value H</option>
				<option value="i" selected>Value I</option>
			</gov-form-multi-select>
			<br>
			<gov-form-multi-select size="xl" id="ba" placeholder="Placeholder" wcag-described-by="me-and-you" invalid="true">
				<option value>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d" selected>Value D</option>
				<option value="e">Value E</option>
				<option value="f">Value F</option>
				<option value="g">Value G</option>
				<option value="h">Value H</option>
				<option value="i" selected>Value I</option>
			</gov-form-multi-select>
			<br>
			<gov-form-multi-select size="xl" id="ba" placeholder="Placeholder" wcag-described-by="me-and-you" success="true">
				<option value>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d" selected>Value D</option>
				<option value="e">Value E</option>
				<option value="f">Value F</option>
				<option value="g">Value G</option>
				<option value="h">Value H</option>
				<option value="i" selected>Value I</option>
			</gov-form-multi-select>
			<br>
			<gov-form-checkbox name="test-me-c" value="me" checked no-label></gov-form-checkbox>
			<gov-form-radio name="superRadio2" value="me1" no-label></gov-form-radio>
			<br>
			<gov-form-radio name="superRadio2" value="me2" checked no-label></gov-form-radio>
			<gov-form-switch name="test-me" value="me2" checked no-label></gov-form-switch>
			<gov-form-checkbox name="test-me-c" value="me" checked>
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-checkbox>
			<gov-form-radio name="superRadio" value="me1">
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-radio>
			<gov-form-radio name="superRadio" value="me2" checked>
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-radio>
			<gov-form-switch name="test-me" value="me2" checked>
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-switch>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>
				Date & Time input (nativní)
			</h2>
			<gov-form-input size="m" placeholder="Co hledáte" input-type="datetime-local"></gov-form-input>
			<br>
			<gov-form-input size="l" placeholder="Co hledáte" input-type="date"></gov-form-input>
			<br>
			<gov-form-input size="xl" placeholder="Co hledáte" input-type="time"></gov-form-input>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Search</h2>
			<gov-form-control>
				<gov-form-group>
					<gov-form-search name="test-me-c" value="me" variant="secondary">
						<gov-form-input slot="input" id="kapr" name="test-me" size="m" placeholder="Co hledáte"></gov-form-input>
						<gov-button slot="button" variant="primary" size="s">
							<gov-icon slot="left-icon" name="search"></gov-icon>
						</gov-button>
					</gov-form-search>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-search name="test-me-c" value="me" variant="primary">
						<gov-form-input slot="input" id="kapr" name="test-me" size="l" placeholder="Co hledáte"></gov-form-input>
						<gov-button slot="button" variant="primary" size="m">
							Hledat
						</gov-button>
					</gov-form-search>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-search name="test-me-c" value="me"checked variant="secondary">
						<gov-form-input slot="input" id="kapr" size="xl" name="test-me" placeholder="Co hledáte"></gov-form-input>
						<gov-button slot="button" variant="secondary" size="l">
							Hledat
						</gov-button>
					</gov-form-search>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>File</h2>
			<div class="container-view">
			<h3>Normal 2</h3>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file id="test-me-ujo" multiple accept=".pdf,.jpg,.png,.jpeg" max-file-size="616448">
							<p>
								<gov-button variant="primary" type="outlined" tabindex="-1">
									Nahrát soubor ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file name="test-me-c">
							<p aria-hidden="true">
								<gov-button variant="primary" type="outlined">
									<gov-icon slot="left-icon" name="upload"></gov-icon>
									Nahrát soubor ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file name="test-me-c" invalid>
							<p>
								<gov-button variant="primary" type="outlined">
									<gov-icon slot="left-icon" name="upload"></gov-icon>
									Nahrát soubor ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
					<gov-form-message slot="bottom" variant="error">
						<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
						Required
					</gov-form-message>
				</gov-form-control>
				<br>

				<h3>Expanded</h3>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file expanded name="test-me-c">
							<p>
								Přetáhněte soubor nebo
							</p>
							<p>
								<gov-button variant="primary" type="outlined">
									Nahrajte ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control disabled>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file expanded name="test-me-c" disabled>
							<p>
								Přetáhněte soubor nebo
							</p>
							<p>
								<gov-button disabled variant="primary" type="outlined">
									Nahrát ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control invalid>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file expanded name="test-me-c" invalid>
							<p>
								Přetáhněte soubor nebo
							</p>
							<p>
								<gov-button variant="primary" type="outlined">
									Nahrát ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
					<gov-form-message slot="bottom" variant="error">
						<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
						Required
					</gov-form-message>
				</gov-form-control>
				<br>
			</div>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Multiselect</h2>
			<gov-form-control>
				<gov-form-label slot="top">Multiselect</gov-form-label>
				<gov-form-group>
					<gov-form-multi-select id="ba" placeholder="Placeholder" wcag-described-by="me-and-you">
						<option value>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d" selected>Value D</option>
						<option value="e">Value E</option>
						<option value="f">Value F</option>
						<option value="g">Value G</option>
						<option value="h">Value H</option>
						<option value="i" selected>Value I</option>
					</gov-form-multi-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Autocomplete</h2>
			<gov-form-control>
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr" invalid="true">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr" success="true">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr" disabled="true">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Textarea</h2>
			<h3>
				Default
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of textarea</gov-form-label>
				<gov-form-group>
					<gov-form-input multiline rows="3" name="test-me" placeholder="Placeholder">
						<gov-icon slot="left-icon" name="info"></gov-icon>
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of textarea</gov-form-label>
				<gov-form-group>
					<gov-form-input required multiline rows="3" name="test-me" value="Value of textarea" invalid="TRUE"></gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control id="metro2">
				<gov-form-label size="s" slot="top">Label of textarea</gov-form-label>
				<gov-form-group>
					<gov-form-input multiline rows="3" name="test-me" disabled value="Value of textarea"></gov-form-input>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Checkbox</h2>
			<h3>
				Gaps
			</h3>
			<gov-form-control>
				<gov-form-label size="xs" slot="top">Label of word</gov-form-label>
				<gov-form-group gap="2xs">
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked></gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked></gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="2xs">
					<gov-form-checkbox name="test-me-c" value="me" size="xs" required checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="xs">
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="s">
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="m">
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Default
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked invalid="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked invalid="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked invalid="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" disabled>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="s" disabled="True">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked disabled="TRUE">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked disabled="1">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Radio</h2>
			<h3>
				Default group
			</h3>
			<gov-form-control fieldset>
					<gov-form-label legend size="s" slot="top">Seznam skupiny</gov-form-label>
				<gov-form-group>
					<gov-form-radio name="test1" value="me" size="xs">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test1" value="me2" size="xs" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test2" value="me" size="s">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test2" value="me2" size="s" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test3" value="me" size="m">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test3" value="me2" size="m" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test4" value="me" size="l">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test4" value="me2" size="l" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test5" value="me" size="xs" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test5" value="me2" size="xs" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test6" value="me" size="s" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test6" value="me2" size="s" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test7" value="me" size="m" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test7" value="me2" size="m" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test8" value="me" size="l" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test8" value="me2" size="l" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test9" value="me" size="xs" disabled>
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test9" value="me2" size="xs" checked disabled>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test10" value="me" size="s" disabled="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test10" value="me2" size="s" checked disabled="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test11" value="me" size="m" disabled="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test11" value="me2" size="m" checked disabled="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test12" value="me" size="l" disabled="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test12" value="me2" size="l" checked disabled="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Select</h2>
			<h3>
				Default
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l">
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="xl">
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Prefix / sufix
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Success
			</h3>
			<gov-form-control success="true">
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="xl" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="xl" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s" disabled>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" disabled>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" disabled="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l" disabled="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Input</h2>
			<h3>
				Primary
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="primary" size="m"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input 3333</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="primary" size="l"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="primary" size="xl"></gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Secondary
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="secondary" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="secondary" size="m"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input 3333</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="secondary" size="l"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="secondary" size="xl"></gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Prefix / sufix
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" size="s">
						<p slot="prefix">$</p>
						<p slot="sufix">Kč</p>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" size="m">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Left icon
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Right icon
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s">
					<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m">
					<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Success
			</h3>
			<gov-form-control type="input" id="metro2" success="true">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2" success="true">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2" success="True">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2" success="1">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s" invalid="true"></gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m" invalid="true"></gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l" invalid="true">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl" invalid="true">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control size="m" type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s" disabled>
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control size="m" type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m" disabled>
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l" disabled="True">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl" disabled="1">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h3>
				Password power
			</h3>
			<gov-form-password-power power="0"></gov-form-password-power>
			<gov-form-password-power power="1">slabé</gov-form-password-power>
			<gov-form-password-power power="2">střední</gov-form-password-power>
			<gov-form-password-power power="3">silné</gov-form-password-power>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Switch</h2>
			<h3>
				Default
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>

			<h3>
				With message
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				With label
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" disabled>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" disabled="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked disabled="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked disabled="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="xs" invalid="True">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="s" invalid="TRUE">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="m" invalid="true" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="l" invalid="1" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
		`;
  }
}
if (customElements.get('forms-page') === undefined) {
  customElements.define('forms-page', FormsPage);
}
//# sourceMappingURL=Forms.js.map
