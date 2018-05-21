import Vue from 'vue';
import VueI18n from 'vue-i18n';
import EditPassword from '@/components/profile/EditPassword';
import BootstrapVue from 'bootstrap-vue';
import {shallow} from '@vue/test-utils';
import translations from '@/translations';
import VeeValidate from 'vee-validate';
import Sinon from 'sinon';

describe('EditPassword.vue', () => {
    let sandbox = null;

    const i18n = new VueI18n({
            locale: 'en',
            messages: translations
        }),
        v = new VeeValidate.Validator();

    Vue.use(VueI18n);
    Vue.use(BootstrapVue);

    beforeEach(function () {
        sandbox = Sinon.sandbox.create();

        sandbox.stub(EditPassword, 'data').callsFake(function () {
            return {
                currentPassword: '',
                newPassword: '',
                loading: false,
                showNew: true,
                showCurrent: true,
                inputCurrent: 'password',
                inputNew: 'password',
                userId: ''
            };
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('PasswordReset page loaded', () => {
        const wrapper = shallow(EditPassword, {
            provide: () => ({
                $validator: v
            }),
            i18n
        });

        expect(wrapper.name()).to.equal('Edit-Password');
    });

    it('revealNew method changes input state', () => {
        const wrapper = shallow(EditPassword, {
            provide: () => ({
                $validator: v
            }),
            i18n
        });

        wrapper.vm.revealNew();

        expect(wrapper.vm.inputNew).to.equal('text');
        expect(wrapper.vm.showNew).to.equal(false);

        wrapper.vm.revealNew();

        expect(wrapper.vm.inputNew).to.equal('password');
        expect(wrapper.vm.showNew).to.equal(true);
    });

    it('revealCurrent method changes input state', () => {
        const wrapper = shallow(EditPassword, {
            provide: () => ({
                $validator: v
            }),
            i18n
        });

        wrapper.vm.revealCurrent();

        expect(wrapper.vm.inputCurrent).to.equal('text');
        expect(wrapper.vm.showCurrent).to.equal(false);

        wrapper.vm.revealCurrent();

        expect(wrapper.vm.inputCurrent).to.equal('password');
        expect(wrapper.vm.showCurrent).to.equal(true);
    });
});
