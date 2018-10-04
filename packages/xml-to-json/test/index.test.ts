import xmlToJSON from '../src/index';
test('xml-to-json', () => {
    const json = xmlToJSON(`
        <template>
            <div id="box">
                <button v-if="sd" type="button">submit</button>
                <template v-else>22</template>
            </div>
        </template>
    `);
    const template = (json.children || []).find((item) => item.tag === 'template');
    console.log(JSON.stringify(json));
    console.log(`template=`, template);
    expect(template && template.tag === 'template').toBe(true);
});
