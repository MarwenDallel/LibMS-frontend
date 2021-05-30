import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { User } from 'app/pages/CommonPages/UserProfilePage/slice/types';
import { getToken } from 'app/services/auth/tokens.service';
import request from 'utils/request';

const getProfile = async (token: string | null): Promise<User | null> => {
  try {
    request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const user: User = await request.get(USER_ENDPOINTS.profile);
    return user;
  } catch (error) {
    return null;
  }
};

const requireRole = async (to, from, next) => {
  const token = getToken();
  const roles = to.meta.roles;

  if (!token) {
    if (roles) next.redirect('/auth');
    next();
  } else {
    // Check token validity
    const user = await getProfile(token);
    if (!user && !roles) next();
    if (!user && roles) next.redirect('/auth');
    if (user) {
      if (roles) roles.includes(user.role) ? next() : next.redirect('/404');
      else next.redirect('/user');
    }
  }
};

export default requireRole;
