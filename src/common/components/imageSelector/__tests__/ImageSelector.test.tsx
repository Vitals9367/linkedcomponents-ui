import React from 'react';

import { testIds } from '../../../../constants';
import { Image, ImageFieldsFragment } from '../../../../generated/graphql';
import getValue from '../../../../utils/getValue';
import { fakeImage } from '../../../../utils/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../utils/testUtils';
import {
  images,
  loadMoreImages,
  mockedImagesReponse,
  mockedLoadMoreImagesResponse,
  publisher,
} from '../__mocks__/imageSelector';
import ImageSelector, {
  ImageItem,
  ImageItemProps,
  ImageSelectorProps,
} from '../ImageSelector';

configure({ defaultHidden: true });

const defaultImageSelectorProps: ImageSelectorProps = {
  onChange: jest.fn(),
  publisher,
  value: [],
};

const defaultImageItemProps: ImageItemProps = {
  checked: false,
  disabled: false,
  image: images.data[0] as ImageFieldsFragment,
  onClick: jest.fn(),
  onDoubleClick: jest.fn(),
};

const mocks = [mockedImagesReponse, mockedLoadMoreImagesResponse];

const renderImageSelector = (props?: Partial<ImageSelectorProps>) =>
  render(<ImageSelector {...defaultImageSelectorProps} {...props} />, {
    mocks,
  });

const renderImageItem = (props?: Partial<ImageItemProps>) =>
  render(<ImageItem {...defaultImageItemProps} {...props} />);

describe('ImageSelector', () => {
  test('should render image selector', async () => {
    renderImageSelector();

    const loadMoreButton = screen.getByRole('button', { name: /näytä lisää/i });
    await waitFor(() => expect(loadMoreButton).toBeEnabled());

    images.data.forEach((image) => {
      screen.getByLabelText(getValue(image?.name, ''));
    });
  });

  test('should load more images', async () => {
    const user = userEvent.setup();
    renderImageSelector();

    const loadMoreButton = screen.getByRole('button', { name: /näytä lisää/i });

    await waitFor(() => expect(loadMoreButton).toBeEnabled());
    await user.click(loadMoreButton);

    await waitFor(() => expect(loadMoreButton).toBeEnabled());

    for (const image of loadMoreImages.data) {
      await screen.findByLabelText(getValue(image?.name, ''), undefined, {
        timeout: 5000,
      });
    }
  });

  test('should call onChange', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    renderImageSelector({ onChange });

    const loadMoreButton = screen.getByRole('button', { name: /näytä lisää/i });

    await waitFor(() => expect(loadMoreButton).toBeEnabled());

    const { name, atId } = images.data[0] as Image;

    await user.click(screen.getByLabelText(getValue(name, '')));
    expect(onChange).toBeCalledWith([atId]);
  });

  test('should clear value when clicking selected image', async () => {
    const onChange = jest.fn();
    const { name, atId } = images.data[0] as Image;
    const user = userEvent.setup();
    renderImageSelector({ onChange, value: [atId] });

    const loadMoreButton = screen.getByRole('button', { name: /näytä lisää/i });

    await waitFor(() => expect(loadMoreButton).toBeEnabled());

    await user.click(screen.getByLabelText(getValue(name, '')));
    expect(onChange).toBeCalledWith([]);
  });

  test('should call onChange with multiple image ids', async () => {
    const onChange = jest.fn();
    const { atId } = images.data[0] as Image;
    const user = userEvent.setup();
    renderImageSelector({ multiple: true, onChange, value: [atId] });

    const loadMoreButton = screen.getByRole('button', { name: /näytä lisää/i });

    await waitFor(() => expect(loadMoreButton).toBeEnabled());

    const { name, atId: atId2 } = images.data[1] as Image;
    await user.click(screen.getByLabelText(getValue(name, '')));

    expect(onChange).toBeCalledWith([atId, atId2]);
  });
});

describe('ImageItem', () => {
  test('should show placeholder image if url is empty', () => {
    const image = fakeImage({ url: '' });
    renderImageItem({ image });

    screen.getByTestId(`${testIds.imageSelector.imageItem}-${image.id}`);
  });
});
