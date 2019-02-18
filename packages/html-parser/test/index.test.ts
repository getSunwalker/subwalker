import xmlToJSON from '../src/index';
test('xml-to-json', () => {
    const json = xmlToJSON(`
        <template>
            <div id="box">
                <button v-if="sd" type="button" :name="name" v-bind="$attrs" v-bind:value="123">submit</button>
                <template v-else>22</template>
            </div>
        </template>
    `);
    const template = (json.children || []).find((item) => item.tag === 'template');
    console.log(JSON.stringify(json));
    console.log(`template=`, template);
    expect(template && template.tag === 'template').toBe(true);
});
