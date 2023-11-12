/* eslint-disable no-unused-vars */
/* eslint-disable space-infix-ops */
import { React, useContext, useEffect, useState } from 'react';
import './Order.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useModal from '../../hooks/useModal';
import Modal from '../Modal/index';
import icon from '../../images/order_chevron.svg';
import PopupWithEmail from './PopupWithEmail/PopupWithEmail';
import OrderBefore from './OrderBefore/OrderBefore';
import OrderAfter from './OrderAfter/OrderAfter';
import {
  getCartData,
  getUserData,
  getUserOrdersData,
} from '../../store/selectors';
import {
  getCart,
  placeAndPayOrder,
  setCurrentOrder,
  postOrder
} from '../../store/actions';

function Order() {
  const dispatch = useDispatch();
  const { currentOrder } = useSelector(getUserOrdersData);
  const { itemsForOrder } = useSelector(getCartData);
  const { user } = useSelector(getUserData);

  const [payMethod, setPayMethod] = useState('card');
  const [isPopupEmailOpen, setIsPopupEmailOpen] = useState(false);
  const [value, setValue] = useState(user.email);

  const [showModal, setShowModal] = useState(false);
  useModal(showModal, setShowModal);

  // // данные для компонентов в заказе
  const { is_paid } = currentOrder;
  const handleClickInput = () => {
    setIsPopupEmailOpen(!isPopupEmailOpen);
  };
  const handleChangeEmail = () => {
    setValue(value);
  };
  const navigate = useNavigate();
  // функциональность оплаты
  const handlePay = async () => {
    setShowModal(true);
  };
  // оплатить
  const handleNext = async () => {
    await dispatch(
      placeAndPayOrder({
        pay_method: payMethod,
        send_to: value,
      })
    );
    currentOrder && dispatch(getCart());
    console.log('заказ оплачен');
    setShowModal(false);
  };
  // на главную с сохранением заказа в неоплаченные
  const handleBack = async () => {
    await dispatch(
      postOrder({
        pay_method: payMethod,
        send_to: value,
      })
    );
    currentOrder && dispatch(getCart());
    console.log('заказ не оплачен');
    setShowModal(false);
    navigate('/');
  };
  useEffect(() => {
    dispatch(setCurrentOrder({}));
    itemsForOrder.length === 0 && navigate('/cart');
  }, []);
  return (
    <section className='order'>
      <div className='order__header'>
        <Link to='/cart' className='order__text order__text_type_link'>
          Корзина
        </Link>
        <img src={icon} alt='Иконка' className='order__chevron' />
        <p className='order__text'>Оформление заказа</p>
      </div>
      <h1 className='order__title'>
        {!is_paid ? 'Оформление заказа' : 'Заказ оплачен'}
      </h1>
      {!is_paid ? (
        <OrderBefore
          value={value}
          onClickInput={handleClickInput}
          onPay={handlePay}
          payMethod={payMethod}
          setPayMethod={setPayMethod}
        />
      ) : (
        <OrderAfter payMethod={payMethod} value={value} />
      )}
      <PopupWithEmail
        isOpen={isPopupEmailOpen}
        onClose={() => setIsPopupEmailOpen(false)}
        onSubmit={handleChangeEmail}
        value={value}
        setValue={setValue}
      />
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          closeButtonClass='modal__close-button modal__close-button_type_confirm'
        >
          <p className='order-modal__title'>Желаете провести оплату сейчас?</p>
          <p className='order-modal__subtitle'>Вернуться к оплате заказа можно через личный кабинет.</p>
          <div className='order-modal__buttons'>
            <button
              type='button'
              className='order-modal__button order-modal__button_type_pay'
              onClick={handleNext}
            >
              Оплатить
            </button>
            <button type='button' className='order-modal__button order-modal__button_type_back' onClick={handleBack}>
              На главную
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default Order;
